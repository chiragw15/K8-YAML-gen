import Ajv from 'ajv';
import { ToastsStore } from 'react-toasts'

export const copyDict = dict => {
  return JSON.parse(JSON.stringify(dict))
}

export const randomKey = () => {
  return Math.random().toString(36).slice(-5)
}

export const toString = obj => {
  if (isJson(obj)) {
    let val = JSON.parse(obj)
    return JSON.stringify(val, null, 4)
  }
  if (typeof obj == 'string') {
    return obj
  }
  return JSON.stringify(obj, null, 4)
}

export const isJson = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

export const values = dictObject => {
  return Object.keys(dictObject).map(key => dictObject[key])
}

export const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const hashCode = (str, hash = 5381) => {
  var i = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
  * integers. Since we want the results to be always positive, convert the
  * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
};

export const shadeColor = (R, G, B, percent) => {
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

Object.values = Object.values || function(o){return Object.keys(o).map(function(k){return o[k]})};

export const convertTimestampToString = timestamp => {
  let date = new Date(timestamp)
  return date.toDateString() + ' ' + date.toLocaleTimeString()
}


const addAdditionPropertiesField = schema => {
  let tmpSchema = schema
  tmpSchema.additionalProperties = false

  if ('$id' in tmpSchema) {
    delete tmpSchema['$id']
  }
  
  if ('$schema' in tmpSchema) {
    delete tmpSchema['$schema']
  }
  
  if ('properties' in tmpSchema) {
    for (let field in tmpSchema.properties) {
      if ('$id' in tmpSchema.properties[field]) {
        delete tmpSchema.properties[field]['$id']
      }
      if ('$schema' in tmpSchema) {
        delete tmpSchema['$schema']
      }
      addAdditionPropertiesField(tmpSchema.properties[field])
    }
  }
}

export const removeAdditionalPropertiesFromJson = (data, schema) => {
  addAdditionPropertiesField(schema)
  
  var ajv = new Ajv({ removeAdditional: true })
  ajv.addFormat('password', {
    validate: (val) => typeof val === 'string'
  })
  var validate = ajv.compile(schema)

  console.log(validate(data))
  console.log(data)

  return data
}

export const validateJSONSchema = (str) => {
  try{
    let schema = JSON.parse(str);
    if (!("$id" in schema) || !("$schema" in schema) || !("properties" in schema)) return 0;
    return 1;
  }
  catch(e){
    return 0;
  } 
    
}

export const recursiveValidateJSON = (json) => {

  // check if description and type are given for property
  if (!("description" in json) || !("type" in json)) return false;

  let retVal =true;
  let desc = "An explanation about the purpose of this instance.";

  // recursively check that each property has a well written description.
  if (json["type"] === "object"){
    for (let field in json.properties){
      if (!("description" in json.properties[field]) || !("type" in json.properties[field])) {
        return false;
      }

      // description can't be empty, neither can be same as previous one.
      if (json.properties[field].description === "" || json.properties[field].description === desc) return false;
      desc = json.properties[field].description;
      if (json.properties[field].type === "object") {
        retVal &= recursiveValidateJSON(json.properties[field]); 
      }
    }
  }
  return retVal; 
}

export const isInputValidJSON = (state) => {
  if (!isJson((state.inputSchema || state.input_schema))) {
    ToastsStore.error(`Input Schema is not a valid json`);
    return false;
  }
  if (!isJson(state.sample_input)) {
    ToastsStore.error(`Sample Input is not a valid json`);
    return false;
  }
  return true;
}

export const isAtleastOneInputFilled = (state) => {
  if (
    (state.inputSchema || state.input_schema) === "{}" &&
    state.input_params === "" &&
    state.sample_input === ""
  ) {
    ToastsStore.error(
      `You need to fill out atleast one of input schema or input details fields`,
      5000
    );
    return false;
  }
  return true;
}

export const isInputValidated = (state) => {
  if (!isAtleastOneInputFilled(state)) return false;

  if (!((state.inputSchema || state.input_schema) === "{}")) {
    if (!validateJSONSchema((state.inputSchema || state.input_schema))) {
      ToastsStore.error(
        `Input Schema not filled according to JSON Schema. Check out the link provided in the info button. Fields like $id, $schema or properties might be missing.`,
        10000
      );
      return false;
    }
    if (
      !recursiveValidateJSON(JSON.parse((state.inputSchema || state.input_schema)))
    ) {
      ToastsStore.error(
        `Description fields not well written for some properties in Input Schema`,
        5000
      );
      return false;
    }
  } else if (
    state.input_params === "" ||
    state.sample_input === ""
  ) {
    ToastsStore.error(
      `You need to fill both input params and sample input fields.`,
      4000
    );
    return false;
  }
  else if (!isInputValidJSON(state)) 
    return false;

  return true;
}

export const isOutputValidJSON = (state) => {
  if (!isJson((state.outputSchema || state.output_schema))) {
    ToastsStore.error(`Output Schema is not a valid json`);
    return false;
  }
  if (!isJson(state.sample_output)) {
    ToastsStore.error(`Sample Output is not a valid json`);
    return false;
  }
  return true;
}

export const isAtleastOneOutputFilled = (state) => {
  if (
    (state.outputSchema || state.output_schema) === "{}" &&
    state.output_params === "" &&
    state.sample_output === ""
  ) {
    ToastsStore.error(
      `You need to fill out atleast one of output schema or output details fields.`,
      5000
    );
    return false;
  }
  return true;
}

export const isOutputValidated = (state) => {
  if (!isAtleastOneOutputFilled(state)) return false;

  if (!((state.outputSchema || state.output_schema) === "{}")) {
    if (!validateJSONSchema((state.outputSchema || state.output_schema))) {
      ToastsStore.error(
        `Output Schema not filled according to JSON Schema. Check out the link provided in the info button. Fields like $id, $schema or properties might be missing.`,
        10000
      );
      return false;
    }
    if (
      !recursiveValidateJSON(JSON.parse((state.outputSchema || state.output_schema)))
    ) {
      ToastsStore.error(
        `Description fields not well written for some properties in Output Schema.`,
        5000
      );
      return false;
    }
  } else if (
    state.output_params === "" ||
    state.sample_output === ""
  ) {
    ToastsStore.error(
      `You need to fill both output params and sample output fields.`
    );
    return false;
  }
  else if (!isOutputValidJSON(state)) 
    return false;
    
  return true;
}