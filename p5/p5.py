import csv
import copy
import pprint
pp = pprint.PrettyPrinter(indent=4)

FILENAME = "p5/p5_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append(next(iter(row),None))
    return output

stacks = {
    "1": ["F","C","P","G","Q","R"],
    "2": ["W","T","C","P"],
    "3": ["B","H","P","M","C"],
    "4": ["L","T","Q","S","M","P","R"],
    "5": ["P","H","J","Z","V","G","N"],
    "6": ["D","P","J"],
    "7": ["L","G","P","Z","F","J","T","R"],
    "8": ["N","L","H","C","F","P","T","J"],
    "9": ["G","V","Z","Q","H","T","C","W"]
}

#                         [R] [J] [W]
#             [R] [N]     [T] [T] [C]
# [R]         [P] [G]     [J] [P] [T]
# [Q]     [C] [M] [V]     [F] [F] [H]
# [G] [P] [M] [S] [Z]     [Z] [C] [Q]
# [P] [C] [P] [Q] [J] [J] [P] [H] [Z]
# [C] [T] [H] [T] [H] [P] [G] [L] [V]
# [F] [W] [B] [L] [P] [D] [L] [N] [G]
#  1   2   3   4   5   6   7   8   9 

# stacks = {
#     "1": ["Z","N"],
#     "2": ["M","C","D"],
#     "3": ["P"]
# }

#     [D]    
# [N] [C]    
# [Z] [M] [P]
#  1   2   3 


def process(arr):
    for r in arr:
        move = r.split(" ")
        num, source, dest = move[1], move[3], move[5]
        count = int(num)
        while count:
            stacks[dest].append(stacks[source].pop())
            count -= 1
    tops = "".join([stacks[k][-1] for k in stacks])
    return tops

def process_p2(arr):
    count = 0
    for r in arr:
        move = r.split(" ")
        num, source, dest = int(move[1]), move[3], move[5]
        idx = len(stacks[source])-num
        to_move = stacks[source][idx:]
        stacks[source] = stacks[source][:idx]
        stacks[dest] = stacks[dest] + to_move
    tops = "".join([stacks[k][-1] for k in stacks])
    return tops

def main():
    arr = get_data()
    #tops = process(arr)
    tops_p2 = process_p2(arr) 
    print(tops_p2)

main()