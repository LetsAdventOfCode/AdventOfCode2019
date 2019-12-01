filepath = "input.txt"
total_fuel = 0
with open(filepath, "r") as file:
    for line in file:
        value = int(line)
        total_fuel += value // 3 - 2
print(total_fuel)
