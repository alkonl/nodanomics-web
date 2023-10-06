import {Graph, RunManager} from "../../service";

const graph = new Graph()
const runManager = new RunManager(graph)
graph.attachRunManager(runManager)

export {graph,runManager}
