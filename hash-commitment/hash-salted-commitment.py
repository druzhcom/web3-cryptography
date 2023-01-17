import random
from hashlib import sha1

m = 13
s = random.randint(1, 9999)
c = sha1(bytes(m + s)).hexdigest()
print(c)

# Дилер в игры
o = 13
check = sha1(bytes(o + s)).hexdigest()
print("Даша выиграла!") if c == check else "Попробуй ещё раз!" 
