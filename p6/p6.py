import csv
import copy
import pprint
pp = pprint.PrettyPrinter(indent=4)

FILENAME = "p6/p6_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append(next(iter(row),None))
    return output

def process(arr):
    arr = arr[0]
    mem = []
    for idx, r in enumerate(arr):
        mem.append(r)
        if len(mem) > 4:
            mem.pop(0)
        if len(set(mem)) == 4:
            return idx + 1
    return 0

def process_p2(arr):
    arr = arr[0]
    mem = []
    for idx, r in enumerate(arr):
        print(idx, r)
        mem.append(r)
        if len(mem) > 14:
            mem.pop(0)
        if len(set(mem)) == 14:
            return idx + 1
    return 0

def main():
    arr = get_data()
    print(arr)
    #tops = process(arr)
    tops_p2 = process_p2(arr) 
    print(tops_p2)

main()