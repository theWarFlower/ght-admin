export const stages = [
    'ordering',
    'pre-wire',
    'trimout',
    'rackbuild',
    'install',
    'punch-list',
];

export const stageNames = {
    ordering: "Ordering Parts",
    'pre-wire': "Pre-wire Scheduled",
    trimout: "Trimout Scheduled",
    rackbuild: "Building Rack",
    install: "Installation Scheduled",
    'punch-list': "Final Punch List",
};

export const stageChoices = stages.map(type => ({
    id: type,
    /* @ts-ignore */
    name: stageNames[type],
}));