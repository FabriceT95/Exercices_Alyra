# Exercice 1.3.1 Alyra
def chiffreCesar(message, key):
    alphabetMinuscule = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
             'v', 'w', 'x', 'y', 'z']
    alphabetMajucule = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
             'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    chiffres = ['1','2', '3', '4', '5','6', '7', '8', '9', '0']

    messageToList = list(message)
    cryptedMessageArray = []
    indexLetter = 0;
    Decalage = ''
    for letter in messageToList:
        if letter.isdigit():
            indexDigit = chiffres.index(letter)
            Decalage = chiffres[(indexDigit + key) % 10]
        elif  letter.isupper():
            indexLetter = alphabetMajucule.index(letter)
            Decalage = alphabetMajucule[(indexLetter + key) % 26]
        elif letter.islower():
            indexLetter = alphabetMinuscule.index(letter)
            Decalage = alphabetMinuscule[(indexLetter + key) % 26]

        cryptedMessageArray.append(Decalage)

    return ''.join(cryptedMessageArray)

print(chiffreCesar('1234567890',1))


generation = 5
fibo = []
i = 0
while len(fibo) < generation:
    if len(fibo) < 2:
        fibo[i] = 1
        i = i + 1
    else:
        fibo[i] = fibo[i-1] + fibo[i-2]
        i = i + 1

print(fibo)