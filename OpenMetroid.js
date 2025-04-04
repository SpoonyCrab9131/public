let config = {

    parent: game,

    width: 1536,
    height: 960,
    type: Phaser.WEBGL,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: true
        }
    },
    fps: { 
        limit: 60
    },
    input: {
        gamepad: true,
    }
};

let map;
let tiles;
let layer;
let cursors;
let samus;
let direction;
let pad;
let gamepad;
let diagdown;

function preload ()
{
    this.load.image('background', 'Assets/Backgrounds/Background1.png');
    this.load.image('testTiles', 'Assets/TileSets/TestSet.png');
    this.load.tilemapTiledJSON('testMap', 'Assets/TileMaps/TestMap.json');
    this.load.spritesheet('samusright', 'Assets/Animations/Samus/RunRight.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusleft', 'Assets/Animations/Samus/RunLeft.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusidleright', 'Assets/Animations/Samus/IdleRight.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusidleleft', 'Assets/Animations/Samus/IdleLeft.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusidleupright', 'Assets/Animations/Samus/IdleUpRight.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusidleupleft', 'Assets/Animations/Samus/IdleUpLeft.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusidleupdiagright', 'Assets/Animations/Samus/IdleUpDiagRight.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusidleupdiagleft', 'Assets/Animations/Samus/IdleUpDiagLeft.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusidledowndiagright', 'Assets/Animations/Samus/IdleDownDiagRight.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusidledowndiagleft', 'Assets/Animations/Samus/IdleDownDiagLeft.png', { frameWidth: 120, frameHeight: 138 });
    this.load.spritesheet('samusturn', 'Assets/Animations/Samus/Turn.png', { frameWidth: 120, frameHeight: 138 });
}

function create ()
{
    this.add.image(0,0,'background').setOrigin(0, 0);

    this.map = this.make.tilemap({key: 'testMap'});

    this.tiles = this.map.addTilesetImage('TestSet', 'testTiles');

    this.layer = this.map.createLayer(0, this.tiles, 0, 0);

    this.samus = this.physics.add.sprite(96, 96, 'samusidleright');

    this.samus.setCollideWorldBounds(true);

    this.samus.body.setSize(42, 93);

    this.samus.body.setOffset(39, 45);

    direction = 0;

    this.anims.create
    ({
        key: 'right',
        frames: this.anims.generateFrameNumbers('samusright', { start: 0, end: 9 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'idleright',
        frames: this.anims.generateFrameNumbers('samusidleright', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'idleupright',
        frames: this.anims.generateFrameNumbers('samusidleupright', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'idleupdiagright',
        frames: this.anims.generateFrameNumbers('samusidleupdiagright', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'idledowndiagright',
        frames: this.anims.generateFrameNumbers('samusidledowndiagright', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'turnright',
        frames: this.anims.generateFrameNumbers('samusturn', { start: 1, end: 3 }),
        frameRate: 40,
        repeat: 0
    });

    this.anims.create
    ({
        key: 'left',
        frames: this.anims.generateFrameNumbers('samusleft', { start: 0, end: 9 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'idleleft',
        frames: this.anims.generateFrameNumbers('samusidleleft', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'idleupleft',
        frames: this.anims.generateFrameNumbers('samusidleupleft', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'idleupdiagleft',
        frames: this.anims.generateFrameNumbers('samusidleupdiagleft', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'idledowndiagleft',
        frames: this.anims.generateFrameNumbers('samusidledowndiagleft', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create
    ({
        key: 'turnleft',
        frames: this.anims.generateFrameNumbers('samusturn', { start: 2, end: 0 }),
        frameRate: 40,
        repeat: 0
    });

    this.map.setCollision([66,67,68,69,70,71,72,73]);
}

function update ()
{
    this.physics.collide(this.samus, this.layer);

    this.pad = this.input.gamepad.gamepads;

    for (let i = 0; i < this.pad.length; i++)
    {
        this.gamepad = this.pad[i];

        if (!this.gamepad)
        {
                continue;
        }

        if (this.samus.body.onFloor() === true)
        {
            if (!(this.gamepad.up) && !(this.gamepad.L1) && !(this.gamepad.down))
            {
                if (this.gamepad.right)
                {
                    this.samus.body.setSize(42, 93);

                    this.samus.body.setOffset(39, 45);

                    direction = 1;

                    if (this.samus.anims.getName() === 'idleright')
                    {
                        this.samus.anims.play('right', true);
                    }
                    else if (this.samus.anims.getName() === 'idleleft' || this.samus.anims.getName() === 'left')
                    {
                        this.samus.anims.play('turnright', true);

                        this.samus.anims.chain('right', true);
                    }
                }
                else if (this.gamepad.left)
                {
                    this.samus.body.setSize(42, 93);

                    this.samus.body.setOffset(39, 45);

                    direction = -1;

                    if (this.samus.anims.getName() === 'idleleft')
                        {
                            this.samus.anims.play('left', true);
                        }
                        else if (this.samus.anims.getName() === 'idleright' || this.samus.anims.getName() === 'right')
                        {
                            this.samus.anims.play('turnleft', true);
                
                            this.samus.anims.chain('left', true);
                        }
                }
                else
                {
                    if (direction === 1)
                    {
                        this.samus.body.setSize(42, 93);

                        this.samus.body.setOffset(39, 45);

                        this.samus.anims.play('idleright', true);
                    }
                    else if (direction === -1)
                    {
                        this.samus.body.setSize(42, 93);

                        this.samus.body.setOffset(39, 45);

                        this.samus.anims.play('idleleft', true);
                    }
                }
            }
            else if (this.gamepad.up && !(this.gamepad.L1) && !(this.gamepad.down))
            {
                if (direction === 1)
                {
                    this.samus.body.setSize(42, 96);

                    this.samus.body.setOffset(39, 42);

                    this.samus.anims.play('idleupright', true);
                }
                else if (direction === -1)
                {
                    this.samus.body.setSize(42, 96);

                    this.samus.body.setOffset(39, 42);

                    this.samus.anims.play('idleupleft', true);
                }
            }
            else if (this.gamepad.L1 && !(this.gamepad.down))
            {
                diagdown = false;

                if (direction === 1)
                {
                    this.samus.body.setSize(42, 96);

                    this.samus.body.setOffset(39, 42);

                    this.samus.anims.play('idleupdiagright', true);
                }
                else if (direction === -1)
                {
                    this.samus.body.setSize(42, 96);

                    this.samus.body.setOffset(39, 42);

                    this.samus.anims.play('idleupdiagleft', true);
                }
            }
            else if (this.gamepad.L1 && this.gamepad.down)
            {
                diagdown = true;

                if (direction === 1)
                {
                    this.samus.body.setSize(42, 96);

                    this.samus.body.setOffset(39, 42);

                    this.samus.anims.play('idledowndiagright', true);
                }
                else if (direction === -1)
                {
                    this.samus.body.setSize(42, 96);

                    this.samus.body.setOffset(39, 42);

                    this.samus.anims.play('idledowndiagleft', true);
                }
            }
        }

        if (this.samus.anims.getName() === 'right' && this.samus.frame.name > 0)
        {
            this.samus.setVelocityX(480);
        }
        else if (this.samus.anims.getName() === 'left'&& this.samus.frame.name > 0)
        {
            this.samus.setVelocityX(-480);
        }
        else
        {
            this.samus.setVelocityX(0);
        }
    }
}

const OpenMetroid = new Phaser.Game(config);