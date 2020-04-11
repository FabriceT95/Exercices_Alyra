# Exercice 1.3.2 Alyra
def frequences(message):
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                         't', 'u',
                         'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    tab = []

    for letter in alphabet:
        letter_count = message.count(letter)
        if letter_count > 0 :
            tab.append(str(letter_count)+' '+letter)

    return tab

print(frequences('CNZNCZCBZNhjghjbvVBHJvjghjgvhjvjhVHJvJHVUOIUopiuUHiouh'))




