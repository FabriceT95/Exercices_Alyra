import math
class Cercle():
    def __init__(self, rayon):
        self.rayon = rayon

    def aire(self):
        return math.pi * math.pow(self.rayon, 2)

    def perimetre(self):
        return 2 * math.pi * self.rayon

r = 5
c = Cercle(r)
print("L'aire du cercle de rayon"+ str(r) +" est de "+ str(c.aire()))
print("Le périmètre du cercle de rayon"+ str(r) +" est de "+ str(c.perimetre()))