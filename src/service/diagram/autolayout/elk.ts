import Elk from "elkjs/lib/elk.bundled";

export const elk = new Elk({
});
export const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    "elk.layered.feedbackEdges": "true",
    'elk.spacing.nodeNode': '100',
    "elk.direction": "RIGHT",
    "elk.layered.spacing.edgeNodeBetweenLayers": "50",
    "org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
    "org.eclipse.elk.layered.cycleBreaking.strategy": "DEPTH_FIRST",
    "elk.edgeRouting": "SPLINES",
    "elk.layered.considerModelOrder.strategy": "PREFER_EDGES",
    "elk.mrtree.edgeRoutingMode": "AVOID_OVERLAP",
    "partitioning.activate": 'true',
    "elk.hierarchyHandling": "INCLUDE_CHILDREN",
};
