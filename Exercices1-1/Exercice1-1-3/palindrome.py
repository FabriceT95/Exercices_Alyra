def estPalindrome(string):
    stringJoined = ''.join(string.lower().split(' '))
    stringReversed = ''.join(string[::-1].lower().split(' '))
    if stringJoined == stringReversed:
        return True
    else:
        return False

print(estPalindrome("Un emu a son os au menu"))