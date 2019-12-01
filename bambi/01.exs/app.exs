{:ok, contents} = File.read("../inputs/01.txt")
data = contents |> String.split("\n") |> Enum.map(&String.trim/1) |> Enum.map(&String.to_integer/1)

output = data |> Enum.reduce(0, fn item, acc -> acc + (Float.floor(item / 3) - 2) end) |> Kernel.trunc()
IO.puts "star1 #{output}"
