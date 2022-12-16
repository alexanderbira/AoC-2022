use std::collections::HashMap;
use std::time::Instant;

fn main() {
  let input = include_str!("../../inputs/day02.txt");
  let now = Instant::now();
  day02(input);
  println!("Finished in: {:.3?}", now.elapsed());
}

fn day02(input: &str) {
  let outcomes1 = HashMap::from([
    ("A Y", 8),
    ("A X", 4),
    ("A Z", 3),
    ("B Y", 5),
    ("B X", 1),
    ("B Z", 9),
    ("C Y", 2),
    ("C X", 7),
    ("C Z", 6),
  ]);
  let outcomes2 = HashMap::from([
    ("A Y", 4),
    ("A Z", 8),
    ("A X", 3),
    ("B Y", 5),
    ("B Z", 9),
    ("B X", 1),
    ("C Y", 6),
    ("C Z", 7),
    ("C X", 2),
  ]);

  let mut sum1 = 0;
  let mut sum2 = 0;

  input.lines().for_each(|line| {
    sum1 += outcomes1.get(line).unwrap();
    sum2 += outcomes2.get(line).unwrap();
  });

  println!("{}", sum1);
  println!("{}", sum2);
}
