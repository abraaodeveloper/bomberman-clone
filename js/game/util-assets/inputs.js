const inputs = [
    {
        type: 'keyboard',
        top: {key: 'w', active: false},
        down: {key: 's', active: false},
        left: {key: 'a', active: false},
        right: {key: 'd', active: false},
        bomb: {key: 'b', active: false}
    },
    {
        type: 'keyboard',
        top: {key: 'ArrowUp', active: false},
        down: {key: 'ArrowDown', active: false},
        left: {key: 'ArrowLeft', active: false},
        right: {key: 'ArrowRight', active: false},
        bomb: {key: 'Enter', active: false}
    },    
    {
        type: 'keyboard',
        top: {key: '', active: false},
        down: {key: '', active: false},
        left: {key: '', active: false},
        right: {key: '', active: false},
        bomb: {key: '', active: false}
    },
    {
        type: 'gamepad',
        top: {key: '', active: false},
        down: {key: '', active: false},
        left: {key: '', active: false},
        right: {key: '', active: false},
        bomb: {key: '', active: false}
    }
];

export {inputs};