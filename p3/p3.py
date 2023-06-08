import csv

FILENAME = "p3/p3_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append(next(iter(row),None))
    return output

def process(arr):
    total = 0
    for r in arr:
        assert(len(r) % 2 == 0)
        div = int(len(r)/2)
        h1, h2 = r[:div], r[div:]
        assert(len(h1)==len(h2))
        shared = [l for l in h1 if l in h2]
        assert(len(set(shared)) == 1)
        if shared[0].islower():
            val = ord(shared[0]) - 96
        else:
            val = ord(shared[0]) - 64 + 26
        total += val        
    return total

def process_p2(arr):
    total = 0
    for r_idx in range(0,len(arr),3):
        r = arr[r_idx:r_idx+3]
        assert(len(r) == 3)
        h1, h2, h3 = r[0], r[1], r[2]
        shared = [l for l in h1 if l in h2 and l in h3]
        print(shared)
        assert(len(set(shared)) == 1)
        if shared[0].islower():
            val = ord(shared[0]) - 96
        else:
            val = ord(shared[0]) - 64 + 26
        total += val        
    return total

def main():
    arr = get_data()
    total = process(arr)
    total_p2 = process_p2(arr)
    print(total,total_p2)

main()