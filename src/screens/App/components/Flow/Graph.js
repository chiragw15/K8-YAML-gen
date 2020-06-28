export default class Graph { 
    constructor(noOfVertices) { 
        this.noOfVertices = noOfVertices 
        this.AdjList = {}
        this.sorted = []
    } 
  
    addVertex(v) { 
        this.AdjList[v] = [] 
    } 

    addEdge(v, w) { 
        this.AdjList[v].push(w) 
    } 

    topologicalSortUtil(vertex, visited) { 
        visited[vertex] = true 
          
        for (var neighbour of this.AdjList[vertex]) {
            if (!visited[neighbour]) {
                this.topologicalSortUtil(neighbour, visited)
            }
        } 
        
        this.sorted.push(vertex)
    } 

    topologicalSort() {
        var visited = {}
        
        for (var key in this.AdjList) {
            visited[key] = false 
        }
  
        for (key in this.AdjList) { 
            if (!visited[key]) { 
                this.topologicalSortUtil(key, visited)
            }
        } 
  
        return this.sorted.reverse()
    }
} 

