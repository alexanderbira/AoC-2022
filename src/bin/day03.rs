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

  let rucksacks = input.lines().collect::<Vec<&str>>();
  let mut groups = Vec::new();
  let mut i = 0;
  while i < rucksacks.len() {
    groups.push(vec![rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]]);
    i += 3;
  }

  let mut group_badges = Vec::new();
  for group in groups {
    for i in 0..group[0].len() {
      if group[1].contains(group[0].chars().nth(i).unwrap())
        && group[2].contains(group[0].chars().nth(i).unwrap())
      {
        group_badges.push(group[0].chars().nth(i).unwrap());
        break;
      }
    }
  }

  sum = 0;
  for badge in group_badges {
    sum += if (badge as i32) < 91 {
      badge as i32 - 38
    } else {
      badge as i32 - 96
    };
  }
  println!("{}", sum);
}
