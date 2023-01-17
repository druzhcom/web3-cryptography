import random
from hashlib import sha1

m = 3
c = sha1(bytes(m)).hexdigest()
print(c)

o = 3
check = sha1(bytes(o)).hexdigest()
print("Даша выиграла!") if c == check else "Попробуй ещё раз!"