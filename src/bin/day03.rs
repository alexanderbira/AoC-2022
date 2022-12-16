use std::time::Instant;

fn main() {
  let input = include_str!("../../inputs/day03.txt");
  let now = Instant::now();
  day03(input);
  println!("Finished in: {:.3?}", now.elapsed());
}

fn day03(input: &str) {
  let mut sum = 0;
  input.lines().for_each(|rucksack| {
    let compartment1 = &rucksack[0..rucksack.len() / 2];
    let compartment2 = &rucksack[rucksack.len() / 2..rucksack.len()];
    let chars = compartment1.chars();

    for item in chars {
      if let Some(_) = compartment2.find(item) {
        sum += if (item as i32) < 91 {
          item as i32 - 38
        } else {
          item as i32 - 96
        };
        break;
      }
    }
  });
  println!("{}", sum);
}
