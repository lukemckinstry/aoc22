import csv

FILENAME = "p2/p2_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append(row)
    return output

scores = {
    "X": {"base": 1, "A": "t", "B": "l", "C": "w" }, # rock
    "Y": {"base": 2, "A": "w", "B": "t", "C": "l" }, # paper
    "Z": {"base": 3, "A": "l", "B": "w", "C": "t" }, # scissors 
}

scores_p2 = {
    'A': {'base':1, 't': 'A', 'w': 'B', 'l': 'C'},
    'B': {'base':2, 'l': 'A', 't': 'B', 'w': 'C'},
    'C': {'base':3, 'w': 'A', 'l': 'B', 't': 'C'}
    }
result_key_p2 = {
    "X": "l",
    "Y": "t",
    "Z": "w"
}


result_key = {
    "w": 6,
    "t": 3,
    "l": 0
}

def process(arr):
    total = 0
    for r in arr:
        
        # part 1
        # opp,me = r[0].split(" ")
        # base_score = scores[me]["base"]
        # result = scores[me][opp]
        # result_score = result_key[result]
        # total += base_score + result_score
        #print(opp,target_result )

        #part 2
        opp,target_result_key = r[0].split(" ")
        target_result = result_key_p2[target_result_key]
        result_score = result_key[target_result]
        me = scores_p2[opp][target_result]
        base_score = scores_p2[me]["base"] 
        total += base_score + result_score
        print(opp, target_result, me)
        
    return total


def main():
    arr = get_data()
    score = process(arr)
    print(score)

main()