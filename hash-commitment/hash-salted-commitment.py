import random
from hashlib import sha1

m = 13
s = random.randint(1, 9999)
c = sha1(bytes(m + s)).hexdigest()
print(c)

o = 13
check = sha1(bytes(o)).hexdigest()
print("Даша won!") if c == check else "Попробуй ещё раз!"
