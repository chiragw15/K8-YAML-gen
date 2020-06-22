
const ENVIRONMENT = window.environment || {}

const constants = {
  BACKEND_URL: ENVIRONMENT['APP_BACKEND_URL'] || 'https://backend-devflows-staging.devhub.k8.devfactory.com',
  UI_URL: ENVIRONMENT['APP_UI_URL'] || 'https://devflows-ui-devflows-staging.devhub.k8.devfactory.com',
  ELASTIC_SEARCH_URL: 'https://vpc-dflows-dev-eks-logs-5pgoaaum3rpzxmqoipx7373rhy.us-east-1.es.amazonaws.com',
  NODES_WIKI_LINK: 'https://github.com/trilogy-group/cn-devflows-backend/wiki/Different-types-of-nodes-in-Devflows',
  FRAMEWORKS: ['Django', 'Other'],
  INVOCABLE_CONFIG: {
    'FIELDS': {
      'description': {
        'displayName': 'Description',
        'placeholder': 'Description of the invocable',
        "section": "Basic details",
        "required": true
      },
      'input_schema': {
        "section": "Input"
      },
      'input_params': {
        'displayName': 'Input Parameters',
        'placeholder': 'Input fields along with a brief description',
        "section": "Input"
      },
      'input_constraints': {
        'displayName': 'Input Constraints',
        'placeholder': 'eg: S3 bucket name: must exist, must be in a specific format',
        "section": "Input"
      },
      'sample_input': {
        'displayName': 'Sample Input',
        'placeholder': '',
        "section": "Input"
      },
      'output_schema': {
        "section": "Output"
      },
      'output_params': {
        'displayName': 'Output Parameters',
        'placeholder': 'Output fields along with a brief description',
        "section": "Output"
      },
      'sample_output': {
        'displayName': 'Sample Output',
        'placeholder': '',
        "section": "Output"
      },
      'invocable_definition_json': {
        "section": "Config"
      },
      'list_secret': {
        'displayName': 'Secrets Required',
        'placeholder': 'Environment variables which are secrets',
        "section": "Config"
      },
      'get_secret': {
        'displayName': 'Way to get secret token',
        'placeholder': 'Brief description on how the user can obtain the secret values',
        "section": "Config"
      },
      'features': {
        'displayName': 'Use Cases of Invocable',
        'placeholder': 'What problems does the invocable solve for the user?',
        "section": "Basic details"
      },
      'working': {
        'displayName': 'Working of Invocable',
        'placeholder': 'Brief description on how the invocable works and about any specific cases',
        "section": "Basic details"
      },
      'additional_comments': {
        'displayName': 'Additional Comments',
        'placeholder': '',
        "section": "Basic details"
      },
      "versions": {
        "section": "Version"
      }
    },
    'JSON_INPUT_FIELDS': ['invocable_definition_json', 'input_schema', 'output_schema', 'sample_input', 'sample_output'],
    'SECTIONS': ['Basic details', 'Input', 'Output', 'Config', 'Version']
  },
  INITIAL_FLOW: {
    "offset": { "x": 0, "y": 0 },
    "flow_config": {},
    "nodes": {},
    "links": {},
    "selected": {},
    "hovered": {}
  },
  GITHUB_CLIENT_ID: 'feec6a781af25f4f6bdf',
  // GITHUB_CLIENT_ID: 'e921de6d2035dbb51666',

  HTTP_METHOD_OPTIONS: [
    'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
  ],

  RUNTIME_CONFIG_SCHEMA: {
    "required": [
      "estimated_runtime_mins",
      "max_retries",
      "concurrency"
    ],
    "type": "object",
    "properties": {
      "estimated_runtime_mins": {
        "type": "number",
        "title": "Estimated Runtime Mins",
        "default": 5,
        "examples": [
          5
        ]
      },
      "max_retries": {
        "type": "number",
        "title": "Max Retries",
        "default": 3,
        "examples": [
          3
        ]
      },
      "concurrency": {
        "type": "number",
        "title": "Concurrency",
        "default": 0,
        "examples": [
          5
        ]
      },
      "async_task": {
        "type": "boolean",
        "title": "Asynchronous Task",
        "default": false
      },
      "transformer_expression": {
        "type": "string",
        "title": "Transformer Expression",
        "description": "The JSONata (https://jsonata.org/) transformation to apply to your input payload before sending it to the invocable",
        "default": "",
        "examples": [
          "{ 'context': {'sample': data.example} , 'data': {'message': context.`context-message`} }"
        ]
      }
    }
  },

  RUNTIME_CONFIG_UI_SCHEMA: {
    transformer_expression: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 3
      },
      "ui:placeholder": '{"context":context, "data":data}',
    }
  }
}

export default constants
