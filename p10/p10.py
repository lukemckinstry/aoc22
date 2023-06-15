import csv
import copy
import pprint
pp = pprint.PrettyPrinter(indent=4)

FILENAME = "p10/p10_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append(next(iter(row)))
    return output

def process(arr):
    register = {"val": 1, "cycle": 1}
    queue = []
    signals = {}   
    while arr or queue:
        if queue:
            registerX_inst = queue.pop(0)
            register["val"] += registerX_inst
            register["cycle"] += 1
        else:
            inst = arr.pop(0)
            if inst == "noop":
                queue.append(0)            
            if inst[0:4] == "addx":
                val = int(inst[5:])
                queue += [0,val]
        if register["cycle"] in [20,60,100,140,180,220]:
            signal_strength = register["cycle"] * register["val"]
            signals[register["cycle"]] = signal_strength

        
    total = sum([signals[k] for k in signals])
    return total

def process_p2(arr):
    register = {"val": 1, "cycle": 1}
    queue = []
    signals = {}
    pixels = ""
    while arr or queue:
        if queue:
            #register is pixel visible
            if (register["val"] - 1) <= ((register["cycle"]-1) %40) <= (register["val"] + 1):
                pixels += "#"
            else:
                pixels += "."
            #execute instruction
            registerX_inst = queue.pop(0)
            register["val"] += registerX_inst
            register["cycle"] += 1

        else:
            inst = arr.pop(0)
            print(f" ## inst {inst}")
            if inst == "noop":
                queue.append(0)            
            if inst[0:4] == "addx":
                val = int(inst[5:])
                queue += [0,val]  
      
    render = ""
    for i in range(0,len(pixels)+40,40):
        render += pixels[i:i+40] + "\n" 
        
        
    print(render)
    return 0

def main():
    arr = get_data()
    print(arr)
    #total = process(arr)
    total_p2 = process_p2(arr) 
    print(total_p2)

main()