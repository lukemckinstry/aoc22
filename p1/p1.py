import csv

FILENAME = "p1_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append(row)
    return output


def process(arr):
    totals = []
    subtotal = 0
    for r in arr:
        if not r:
            totals.append(subtotal)
            subtotal = 0
        else:
            subtotal += int(r[0])
    max = sum(sorted(totals, reverse=True)[:3])
    return max


def main():
    arr = get_data()
    max = process(arr)
    print(max)

main()