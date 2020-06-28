import Graph from './Graph'

export default class YAMLGen {

  createGraphFromJson(flowJson) {
    var graph = new Graph(Object.keys(flowJson.nodes).length)

    for (var v in flowJson.nodes) {
      graph.addVertex(v)
    }

    for (var key in flowJson.links) {
      var fromNode = flowJson.links[key].from.nodeId
      var toNode = flowJson.links[key].to.nodeId
      graph.addEdge(fromNode, toNode); 
    }

    return graph
  }

  createKubeObject(node, manifestInfo) {
    node.properties.kind = node.type.replace(/ /g,'')
    node.properties.apiVersion = manifestInfo.apiVersion
    if (manifestInfo.namespace !== 'default')
      node.properties.metadata.namespace = manifestInfo.namespace
    var labels = {}
    if ('labels' in node.properties.metadata) {
      for (var l of node.properties.metadata.labels) {
        labels[l['name']] = l['value']
      }
      node.properties.metadata.labels = labels
    }

    if (node.type === 'Persistent Volume Claim') {
      if ('accessModes' in node.properties.spec) {
        var accesModes = []
        for (var key in node.properties.spec.accessModes) {
          if (node.properties.spec.accessModes[key]) {
            accesModes.push(key)
          }
        }
        node.properties.spec.accessModes = accesModes
      }
    }

    if (node.type === 'Deployment') {
      node.properties.apiVersion = 'extensions/' + node.properties.apiVersion + 'beta1'
      node.properties.spec.selector = {matchLabels: {name: manifestInfo.name}}
    }

    return node.properties
  }

  getTemplateFromContainers(containers, container_keys, graph, flowJson, manifestInfo) {
    var template = {}

    template.metadata = {labels: {name: manifestInfo.name}}
    for(var container of containers) {
      if ('metadata' in container && 'labels' in container.metadata) {
        if (!('metadata' in template)) {
          template.metadata = {}
          template.metadata.labels = {}
        }
        for(var label of container.metadata.labels) {
          template.metadata.labels[label.name] = label.value
        }
      }
    }

    template.spec = {}
    template.spec.containers = []
    for(var container of containers) {
      var temp_container = {}
      if ('metadata' in container ) {
        temp_container.name = container.metadata.name
      }

      for (var key in container) {
        if (key === 'metadata') continue
        temp_container[key] = container[key]
      }
      template.spec.containers.push(temp_container)
    }

    var c = 0
    for (var key of container_keys) {
      for (var neighbour of graph.AdjList[key]) {
        if (flowJson.nodes[neighbour].type === 'Persistent Volume Claim') {
          if ('volumeMounts' in template.spec.containers[c]) {
            if (!('volumes' in template.spec)) {
              template.spec.volumes = []
            }
            for (var vol of template.spec.containers[c].volumeMounts)
              template.spec.volumes.push({name: vol.name, persistentVolumeClaim: {claimName: flowJson.nodes[neighbour].properties.metadata.name}})
          }
        }
      }
      c += 1
    }

    return template
  }

}