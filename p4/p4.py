import csv

FILENAME = "p4/p4_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append(row)
    return output

def process(arr):
    total = 0
    for r in arr:
        g, h = r
        g1, g2 = g.split("-")
        h1, h2 = h.split("-")
        g1, g2, h1, h2 = int(g1), int(g2), int(h1), int(h2)
        if (g1 >= h1 and g2 <= h2) or (h1 >= g1 and h2 <= g2):
            total += 1    
    return total

def process_p2(arr):
    total = 0
    for r in arr:
        g, h = r
        g1, g2 = g.split("-")
        h1, h2 = h.split("-")
        g1, g2, h1, h2 = int(g1), int(g2), int(h1), int(h2)
        # fully contained
        if (g1 >= h1 and g2 <= h2) or (h1 >= g1 and h2 <= g2):
            total += 1
            continue
        # partial overlap
        if (h1 <= g1 <= h2) or (g1 <= h1 <= g2):
            total += 1
            continue
    return total

def main():
    arr = get_data()
    total = process(arr)
    total_p2 = process_p2(arr)
    print(total, total_p2)

main()