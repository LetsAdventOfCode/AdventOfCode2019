total = 0

with open("input.txt") as file:
    for line in file:
        next_fuel = int(line)
        fuel_total = 0
        while True:
            next_fuel = next_fuel // 3 - 2

            if next_fuel > 0:
                fuel_total += next_fuel
            else:
                break

        total += fuel_total
print(total)
