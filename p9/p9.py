import csv
import copy
import pprint
pp = pprint.PrettyPrinter(indent=4)
import numpy as np

FILENAME = "p9/p9_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append(next(iter(row)))
    return output

def move_head(direction, posH):
    key = {
        "U": [0,1],
        "D": [0,-1],
        "L": [-1,0],
        "R": [1,0]
    }    
    return [a+b for a,b in zip(posH,key[direction])]

def move_tail(head_to_tail, posT):
    key = [
        [[2,0],[1,0]],
        [[-2,0],[-1,0]],
        [[0,2],[0,1]],
        [[0,-2],[0,-1]],
        #diagonals
        [[2,1],[1,1]],
        [[2,-1],[1,-1]],
        [[-2,1],[-1,1]],
        [[-2,-1],[-1,-1]],
        [[1,2],[1,1]],
        [[-1,2],[-1,1]],
        [[1,-2],[1,-1]],
        [[-1,-2],[-1,-1]],
        #2x2 moves
        [[2,2],[1,1]],
        [[2,-2],[1,-1]],
        [[-2,2],[-1,1]],
        [[-2,-2],[-1,-1]]
    ]
    move = next(iter([i[1] for i in key if i[0] == head_to_tail]))
    return [a+b for a,b in zip(posT,move)]

def get_head_to_tail(posH, posT):
    return [a-b for a,b in zip(posH,posT)]

def process(arr):
    posH = [0,0]
    posT = [0,0]
    visitedT = [[0,0]]
    for step in arr:
        direction = step[0]
        steps_to_move = int(step[2:]) 
        print(direction, steps_to_move)
        while steps_to_move:
            posH = move_head(direction,posH)
            head_to_tail = get_head_to_tail(posH, posT)
            if max([abs(i) for i in head_to_tail]) > 1:
                posT = move_tail(head_to_tail, posT)
                if posT not in visitedT:
                    visitedT.append(posT)
            steps_to_move -= 1
    return len(visitedT)

def process_p2(arr):
    pos = [[0,0] for i in range(10)]
    visitedT = [[0,0]]
    for step in arr:
        direction = step[0]
        steps_to_move = int(step[2:]) 
        print(direction, steps_to_move)
        while steps_to_move:
            pos[0] = move_head(direction,pos[0])
            for knot in range(1,10):
                head_to_tail = get_head_to_tail(pos[knot-1], pos[knot])
                if max([abs(i) for i in head_to_tail]) > 1:
                    pos[knot] = move_tail(head_to_tail, pos[knot])
                    if knot == 9 and pos[knot] not in visitedT:
                        visitedT.append(pos[knot])
            steps_to_move -= 1
    return len(visitedT)

def main():
    arr = get_data()
    print(arr)
    #total = process(arr)
    total_p2 = process_p2(arr) 
    print(total_p2)

main()