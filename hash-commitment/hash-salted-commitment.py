import random
from hashlib import sha1

m = 13
c = sha1(bytes(m)).hexdigest()
print(c)

o = 13
check = sha1(bytes(o)).hexdigest()
print("Даша won!") if c == check else "Попробуй ещё раз!"