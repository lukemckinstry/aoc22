import csv
import copy
import pprint
pp = pprint.PrettyPrinter(indent=4)

FILENAME = "p7/p7_input.txt"

def get_data():
    output = []
    with open(FILENAME, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            output.append(next(iter(row),None))
    return output


init_dir = {"files":[]}
m = {
    "/": copy.deepcopy(init_dir)
}

def access_m(l):
    localm = m
    for i in l:
        localm = localm[i]
    return localm

def format_file(f):
    filesize, filename = f.split(" ")
    return tuple([filename,filesize])

def make_filetree(arr):
    current_d = []
    while arr:
        com = arr.pop(0)
        if com[0] == "$":
            if com[2:4] == "cd":
                if com[5:] == "/":
                    current_d = ["/"]
                    continue
                if com[5:] == "..":
                    current_d = current_d[:len(current_d)-1]
                else:
                    current_d.append(com[5:])
            if com[2:4] == "ls":
                while True:
                    if not arr:
                        break
                    if arr[0][0] == "$":
                        break
                    else:
                        outp = arr.pop(0)
                        if outp[:3] == "dir":
                            listed_dir = outp[4:]
                            if listed_dir not in access_m(current_d):
                                access_m(current_d)[listed_dir] = copy.deepcopy(init_dir)
                        else:
                            access_m(current_d)["files"].append(format_file(outp))                     
    return m

def calculate_dir_size(name, m):
    files = sum([int(i[1]) for i in m["files"]])
    dirs = [calculate_dir_size(k,m[k]) for k in m if k != "files"]
    dir_sizes = sum([int(i[0]) for i in dirs])
    small_dirs = [i[1] for i in dirs]
    size = files + dir_sizes
    if size <= 100000:
        small_dirs.append(tuple([name,size]))
    return [size,small_dirs]

def gather_dir_sizes(name, m):
    files = sum([int(i[1]) for i in m["files"]])
    dirs = [gather_dir_sizes(k,m[k]) for k in m if k != "files"]
    dir_sizes = sum([int(i[0]) for i in dirs])
    dirs_list = [i[1] for i in dirs]
    size = files + dir_sizes
    dirs_list.append(tuple([name,size]))
    return [size,dirs_list]

def get_sum_small_dir_sizes(d):
    if isinstance(d, tuple):
        return d[1]
    if isinstance(d, list):
        return sum([get_sum_small_dir_sizes(x) for x in d])
    else:
        pass

def make_list_dirs_by_size(d):
    output = []
    if isinstance(d, tuple):
        output.append(d)
    if isinstance(d, list):
        for x in d:
            output += make_list_dirs_by_size(x)
    else:
        pass
    return output

def process(arr):
    filetree = make_filetree(arr)
    dirsize, small_dirs = calculate_dir_size("/", filetree["/"])
    output = get_sum_small_dir_sizes(small_dirs)
    return output

def process_p2(arr):
    filetree = make_filetree(arr)
    used_diskspace, size_by_dir = gather_dir_sizes("/", filetree["/"])
    total_diskspace = 70000000
    needed_free_diskspace = 30000000
    free_diskspace = total_diskspace - used_diskspace
    dirs_by_size = make_list_dirs_by_size(size_by_dir)
    elig_dir = list(filter(lambda x: free_diskspace + x[1] > needed_free_diskspace, dirs_by_size))
    return sorted(elig_dir, key=lambda x: x[1])[0]

def main():
    arr = get_data()
    total = process(arr)
    total_p2 = process_p2(arr)
    print(total,total_p2)

main()