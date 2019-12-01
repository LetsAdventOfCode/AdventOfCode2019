{:ok, contents} = File.read("../inputs/01.txt")
data = contents |> String.split("\n") |> Enum.map(&String.trim/1) |> Enum.map(&String.to_integer/1)

output = data |> Enum.reduce(0, fn item, acc -> acc + (Float.floor(item / 3) - 2) end) |> Kernel.trunc()
IO.puts "star1 #{output}"

defmodule Recursion do
  def calculate_fuel(mass) do
    calculate_fuel(0, mass)
  end

  def calculate_fuel(sum_mass, last_mass) do
    fuel = (Float.floor(last_mass / 3) - 2)
    cond do
      fuel > 0  -> calculate_fuel(sum_mass+fuel, fuel)
      fuel <= 0 -> sum_mass
    end
  end
end

output2 = data |>
            Enum.reduce(0, fn item, acc ->
              acc + Recursion.calculate_fuel(item)
            end) |>
            Kernel.trunc()
IO.puts "star2 #{output2}"
