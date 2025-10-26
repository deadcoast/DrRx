#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/validate-schema.js <schema.json> <data.json>');
  process.exit(1);
}

const schemaPath = path.resolve(args[0]);
const dataPath = path.resolve(args[1]);

const schemaCache = new Map();

function loadSchema(filePath) {
  const normalized = path.resolve(filePath);
  if (schemaCache.has(normalized)) return schemaCache.get(normalized);
  const raw = fs.readFileSync(normalized, 'utf8');
  const schema = JSON.parse(raw);
  schemaCache.set(normalized, schema);
  return schema;
}

function decodePointerSegment(segment) {
  return segment.replace(/~1/g, '/').replace(/~0/g, '~');
}

function resolvePointer(root, pointer) {
  if (!pointer || pointer === '') return root;
  let node = root;
  const parts = pointer.split('/').slice(1); // drop leading empty segment
  for (const rawPart of parts) {
    const part = decodePointerSegment(rawPart);
    if (node && Object.prototype.hasOwnProperty.call(node, part)) {
      node = node[part];
    } else {
      return undefined;
    }
  }
  return node;
}

function resolveRef(ref, context) {
  if (typeof ref !== 'string') return null;
  if (ref.startsWith('#')) {
    const target = resolvePointer(context.rootSchema, ref.slice(1));
    return target === undefined ? null : { schema: target, context };
  }
  const [refPathPart, fragmentPart] = ref.split('#');
  const resolvedPath = path.resolve(path.dirname(context.schemaPath), refPathPart);
  const rootSchema = loadSchema(resolvedPath);
  const pointer = fragmentPart ? (fragmentPart.startsWith('/') ? fragmentPart : `/${fragmentPart}`) : '';
  const target = pointer ? resolvePointer(rootSchema, pointer) : rootSchema;
  if (target === undefined) return null;
  return {
    schema: target,
    context: { schemaPath: resolvedPath, rootSchema }
  };
}

function childPath(base, key) {
  const segment = String(key).replace(/~/g, '~0').replace(/\//g, '~1');
  if (base === '' || base === '/') return `/${segment}`;
  return `${base}/${segment}`;
}

function typeMatches(expected, value) {
  switch (expected) {
    case 'object':
      return value !== null && typeof value === 'object' && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'string':
      return typeof value === 'string';
    case 'integer':
      return typeof value === 'number' && Number.isInteger(value);
    case 'number':
      return typeof value === 'number';
    case 'boolean':
      return typeof value === 'boolean';
    case 'null':
      return value === null;
    default:
      return false;
  }
}

function formatCheck(format, value) {
  if (format === 'date-time' && typeof value === 'string') {
    return Number.isFinite(Date.parse(value));
  }
  return true;
}

function validateSchema(schema, data, context, pointer, errors) {
  if (!schema || typeof schema !== 'object') return;

  if (schema.$ref) {
    const resolved = resolveRef(schema.$ref, context);
    if (!resolved) {
      errors.push(`at ${pointer || '/'}: unresolved $ref ${schema.$ref}`);
      return;
    }
    validateSchema(resolved.schema, data, resolved.context, pointer, errors);
    return;
  }

  if (schema.allOf) {
    for (const sub of schema.allOf) {
      validateSchema(sub, data, context, pointer, errors);
    }
  }

  if (schema.oneOf) {
    let matches = 0;
    let lastErrors = [];
    for (const sub of schema.oneOf) {
      const subErrors = [];
      validateSchema(sub, data, context, pointer, subErrors);
      if (subErrors.length === 0) {
        matches++;
      } else {
        lastErrors = subErrors;
      }
    }
    if (matches !== 1) {
      errors.push(`at ${pointer || '/'}: data must match exactly one schema in "oneOf"`);
      if (matches === 0 && lastErrors.length) errors.push(...lastErrors);
    }
  }

  if (schema.anyOf) {
    let matches = 0;
    for (const sub of schema.anyOf) {
      const subErrors = [];
      validateSchema(sub, data, context, pointer, subErrors);
      if (subErrors.length === 0) {
        matches++;
        break;
      }
    }
    if (matches === 0) {
      errors.push(`at ${pointer || '/'}: data must match at least one schema in "anyOf"`);
    }
  }

  if (schema.if) {
    const conditionalErrors = [];
    validateSchema(schema.if, data, context, pointer, conditionalErrors);
    if (conditionalErrors.length === 0) {
      if (schema.then) validateSchema(schema.then, data, context, pointer, errors);
    } else if (schema.else) {
      validateSchema(schema.else, data, context, pointer, errors);
    }
  }

  if (schema.type) {
    const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matches = expectedTypes.some(t => typeMatches(t, data));
    if (!matches) {
      errors.push(`at ${pointer || '/'}: expected type ${expectedTypes.join(' or ')}`);
      return;
    }
  }

  if (schema.enum) {
    const ok = schema.enum.some(v => JSON.stringify(v) === JSON.stringify(data));
    if (!ok) errors.push(`at ${pointer || '/'}: value ${JSON.stringify(data)} not in enum`);
  }

  if (Object.prototype.hasOwnProperty.call(schema, 'const')) {
    if (JSON.stringify(schema.const) !== JSON.stringify(data)) {
      errors.push(`at ${pointer || '/'}: value must equal ${JSON.stringify(schema.const)}`);
    }
  }

  if (schema.pattern && typeof data === 'string') {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(data)) errors.push(`at ${pointer || '/'}: string does not match pattern ${schema.pattern}`);
  }

  if (typeof schema.minLength === 'number' && typeof data === 'string') {
    if (data.length < schema.minLength) errors.push(`at ${pointer || '/'}: string shorter than ${schema.minLength}`);
  }

  if (typeof schema.minimum === 'number' && typeof data === 'number') {
    if (data < schema.minimum) errors.push(`at ${pointer || '/'}: number less than minimum ${schema.minimum}`);
  }

  if (schema.format && !formatCheck(schema.format, data)) {
    errors.push(`at ${pointer || '/'}: value does not satisfy format ${schema.format}`);
  }

  if (schema.type === 'object' || (Array.isArray(schema.type) && schema.type.includes('object'))) {
    if (data === null || typeof data !== 'object' || Array.isArray(data)) {
      errors.push(`at ${pointer || '/'}: expected object`);
      return;
    }
    if (schema.required) {
      for (const key of schema.required) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
          errors.push(`at ${pointer || '/'}: missing required property "${key}"`);
        }
      }
    }
    if (schema.properties) {
      for (const [key, subSchema] of Object.entries(schema.properties)) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          validateSchema(subSchema, data[key], context, childPath(pointer, key), errors);
        }
      }
    }
    if (schema.additionalProperties === false && schema.properties) {
      for (const key of Object.keys(data)) {
        if (!Object.prototype.hasOwnProperty.call(schema.properties, key)) {
          errors.push(`at ${pointer || '/'}: disallowed additional property "${key}"`);
        }
      }
    } else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
      for (const key of Object.keys(data)) {
        if (!schema.properties || !Object.prototype.hasOwnProperty.call(schema.properties, key)) {
          validateSchema(schema.additionalProperties, data[key], context, childPath(pointer, key), errors);
        }
      }
    }
  }

  if (schema.type === 'array' || (Array.isArray(schema.type) && schema.type.includes('array'))) {
    if (!Array.isArray(data)) {
      errors.push(`at ${pointer || '/'}: expected array`);
      return;
    }
    if (schema.items) {
      for (let i = 0; i < data.length; i++) {
        validateSchema(schema.items, data[i], context, childPath(pointer, i), errors);
      }
    }
  }
}

function main() {
  const rootSchema = loadSchema(schemaPath);
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const errors = [];
  const context = { schemaPath, rootSchema };
  validateSchema(rootSchema, data, context, '', errors);
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log(`Schema validation OK for ${path.relative(process.cwd(), dataPath)}`);
}

main();
