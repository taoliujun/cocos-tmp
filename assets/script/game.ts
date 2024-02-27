import type { Node } from 'cc';
import {
    _decorator,
    assetManager,
    BoxCollider2D,
    Component,
    Contact2DType,
    director,
    EPhysics2DDrawFlags,
    find,
    input,
    Input,
    instantiate,
    PhysicsSystem2D,
    Prefab,
    resources,
    RigidBody2D,
    Sprite,
    Vec2,
} from 'cc';

const { ccclass } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    private startJump = false;

    private body1Step = 25;

    private body2Step = 20;

    private body1: Node = null;

    private body2: Node = null;

    start() {
        // /Users/stao2/www/learn/cocos1/assets/prefab/Body.prefab
        // this.body1 = this.node.getChildByName('Body1');
        // this.body2 = this.node.getChildByName('Body2');
        // this.body1
        //     .getComponent(BoxCollider2D)
        //     .on(Contact2DType.BEGIN_CONTACT, (selfCollider, otherCollider, contact) => {
        //         console.log('==BEGIN_CONTACT', selfCollider, otherCollider, contact);
        //         if (otherCollider) {
        //             this.startJump = false;
        //             // otherCollider.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
        //         }
        //     });
        // this.body1.getComponent(BoxCollider2D).on(Contact2DType.END_CONTACT, (selfCollider, otherCollider, contact) => {
        //     console.log('==END_CONTACT', selfCollider, otherCollider, contact);
        // });
        // input.on(Input.EventType.MOUSE_UP, this.jump, this);
    }

    onLoad() {
        PhysicsSystem2D.instance.debugDrawFlags =
            EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape;

        // console.log('==', resources.load.get('28732e9d-10ed-412f-84d2-aeebdc11d2af', Prefab));
        resources.load('Body', Prefab, (_, data) => {
            console.log('==', data);
        });
        this.body1 = instantiate(resources.get('db://assets/prefab/Body', Prefab));
        this.node.addChild(this.body1);
    }

    update() {
        if (!this.startJump) {
            // return;
        }

        // this.body1.setPosition(this.body1.position.add(new Vec3(this.body1Step, 0, 0)));
        // this.body1.getComponent(BoxCollider2D).apply();
        // this.body2.setPosition(this.body2.position.add(new Vec3(0 - this.body2Step, 0, 0)));
        // this.body2.getComponent(BoxCollider2D).apply();
    }

    jump() {
        if (this.startJump) {
            return;
        }

        this.startJump = true;

        const rb1 = this.body1.getComponent(RigidBody2D);
        // rb1.gravityScale = 0;
        rb1.linearVelocity = new Vec2(this.body1Step, -2);

        const rb2 = this.body2.getComponent(RigidBody2D);
        // rb2.gravityScale = 0;
        rb2.linearVelocity = new Vec2(0 - this.body2Step, -1);
    }
}
