var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var HN = require('./hex-number.js');
var crypto = require('crypto');

// Обязательство для сообщения m
//   r - закрытый ключ используемый как ослепляющий фактор
//   H - точка на эллиптической кривой
function commitTo(H, r, m) {
    return ec.g.mul(r).add(H.mul(m));
}

// сложение двух Обязательств используя аддитивные свойства шифрования
function add(Cx, Cy) {
    return Cx.add(Cy);
}

// вычитание двух Обязательств используя аддитивные свойства шифрования
function sub(Cx, Cy) {
    return Cx.add(Cy.neg());
}

// сложение два известных значения с ослепляющими факторами
//   и вычисляем зафиксированные значеня
//   сложить rX + rY (осепляющие факторы закрытых ключей)
//   сложить vX + vY (скрытые значения)
function addPrivately(H, rX, rY, vX, vY) {
    var rZ = rX.add(rY).umod(ec.n);
    return ec.g.mul(rZ).add(H.mul(vX + vY));
}

// вычитание два известных значения с ослепляющими факторами
//   и вычисляем зафиксированные значеня
//   сложить rX - rY (сепляющие факторы закрытых ключей)
//   сложить vX - vY (скрытые значения)
function subPrivately(H, rX, rY, vX, vY) {
    // umod to wrap around if negative
    var rZ = rX.sub(rY).umod(ec.n);
    return ec.g.mul(rZ).add(H.mul(vX - vY));
}

/**
 * Проверка что обязательства правильные
 * 
 * @param {*} H - вторая точка
 * @param {*} C - обязательство
 * @param {*} r - ослеплящий фактор
 * @param {*} v - оригинальное значение
 */
function verify(H, C, r, v) {
    return ec.g.mul(r).add(H.mul(v)).eq(C);
}

/**
 * создать случайную точку на кривой
 */
function generateRandom() {
    var random;
    do {
        random = HN.toBN(HN.fromBuffer(crypto.randomBytes(32)));
    } while (random.gte(ec.n));
    return random;
}

function generateH() {
    return ec.g.mul(generateRandom());
}


module.exports = {
    commitTo,
    add,
    sub,
    addPrivately,
    subPrivately,
    verify,
    generateRandom,
    generateH
}
