const alive = Object.values(import.meta.glob('./../../image/enemy/alive/*', { as: 'url', eager: true }));
const dead = Object.values(import.meta.glob('./../../image/enemy/dead/*', { as: 'url', eager: true }));
export function getImageAlive() {
    const random = Math.floor(Math.random() * alive.length);
    return alive[random];
}
export function getImageDead() {
    const random = Math.floor(Math.random() * dead.length);
    return dead[random];
}