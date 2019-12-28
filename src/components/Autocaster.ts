export default class Autocaster {
    casts: any[] = []
    hoi: number = 0;

    constructor() {
        console.log("hoi")
    }

    static tick = (test) => {
        test.casts.forEach(cast => {
            cast.autoCastCooldown -= 1;
            if (cast.skill.isActive() && cast.autoCastCooldown <= 0) {
                cast.cast(cast.skill.activate);
                cast.autoCastCooldown = 2000;
            }
        });

        return test;
    };
}