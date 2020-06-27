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

    convertGraphToKubeJson() {

    }

    convertKubeJsonToYAML() {

    }

}