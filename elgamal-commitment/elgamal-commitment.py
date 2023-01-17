from random import randint
p = 11
q = 7
g = 3
h = g**s % p
print("h:", h, ", group:", [h**i % q for i in range(1, q)])

# Prover
m = 13
r = randint(1, q-1)
c0 = ((g**r)) % p
c1 = ((g**m) * (h**r)) % p
print((c0, c1))

check = (g**m * h**r) % p
print("Даша выиграла!") if check == c1 else "Try again!"
