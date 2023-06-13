import csv
import copy
import pprint
pp = pprint.PrettyPrinter(indent=4)
import numpy as np

FILENAME = "p8/p8_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append([int(i) for i in list(next(iter(row),None))])
    return output


def return_visible(ridx, cidx, arr):
    pos = arr[ridx,cidx]
    row = arr[ridx,:]
    col = arr[:,cidx]

    left = row[:cidx]
    right = row[cidx+1:]
    up = col[:ridx]
    down = col[ridx+1:]

    # edge 
    if ridx == 0 or ridx == len(row)-1:
        return True
    if cidx == 0 or cidx == len(col)-1:
        return True
    
    #interior but visible
    max_each_dir = [max(left), max(right), max(up), max(down)] 
    if pos > min(max_each_dir):
        return True
    return False


def get_num_lower(pos,l):
    l = list(l)
    total = 0
    while l:
        t = l.pop(0)
        total += 1
        if t >= pos:
            break
    return total

def get_visibility(ridx, cidx, arr):
    
    pos = arr[ridx,cidx]
    row = arr[ridx,:]
    col = arr[:,cidx]

    left = np.flip(row[:cidx])
    right = row[cidx+1:]
    up = np.flip(col[:ridx])
    down = col[ridx+1:]
    total = 1
    directions = [get_num_lower(pos,direction) for direction in [left,right,up,down]]
    for d in directions:
        total *= d
    return total
    

def process(arr):
    count = 0 
    mat = np.array(arr)
    for ridx,r in enumerate(mat):
        for cidx,c in enumerate(r):    
            if return_visible(ridx,cidx,mat):
                count += 1
    return count

def process_p2(arr):
    max_vis = 0
    max_coords = [None,None]
    mat = np.array(arr)
    print(mat)
    for ridx,r in enumerate(mat):
        for cidx,c in enumerate(r):    
            vis = get_visibility(ridx,cidx,mat)
            if vis > max_vis:
                max_vis = vis
                max_coords = [ridx,cidx]
    return max_vis

def main():
    arr = get_data()
    print(len(arr[0]))
    total = process(arr)
    total_p2 = process_p2(arr) 
    print(total, total_p2)

main()