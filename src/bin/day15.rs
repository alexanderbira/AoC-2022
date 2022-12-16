use regex::Regex;
use std::time::Instant;

fn main() {
  let input = include_str!("../../inputs/day15.txt");
  let now = Instant::now();
  day01(input);
  println!("Finished in: {:.3?}", now.elapsed());
}

fn dist(x1: i32, y1: i32, x2: i32, y2: i32) -> i32 {
  ((x1 - x2).abs() + (y1 - y2).abs()) as i32
}

fn get_x_ranges(y: i32, distances: &Vec<Vec<i32>>) -> Vec<Vec<i32>> {
  let mut ranges: Vec<Vec<i32>> = Vec::new();
  for d in distances {
    let half_width = d[2] - (d[1] - y).abs();

    if half_width >= 0 {
      ranges.push(vec![d[0] - half_width, d[0] + half_width]);
    }
  }
  ranges.sort();
  ranges
}

fn day01(input: &str) {
  let distances = input
    .lines()
    .map(|l| {
      let re = Regex::new(r"(-?\d+)").unwrap();
      let numbers = re
        .captures_iter(l)
        .map(|c| c[1].parse::<i32>().unwrap())
        .collect::<Vec<i32>>();
      vec![
        numbers[0],
        numbers[1],
        dist(numbers[0], numbers[1], numbers[2], numbers[3]),
      ]
    })
    .collect();

  let mut ranges = get_x_ranges(2000000, &distances);

  let mut i = 1;
  while i < ranges.len() {
    if ranges[i][0] <= ranges[i - 1][1] {
      ranges[i][0] = ranges[i - 1][0];
      ranges[i][1] = ranges[i][1].max(ranges[i - 1][1]);
      ranges.remove(i - 1);
    } else {
      i += 1;
    }
  }

  let mut total = 0;
  for r in ranges {
    total += r[1] - r[0];
  }
  println!("{}", total);

  for y in 0..4000000 {
    let ranges = get_x_ranges(y, &distances);

    let mut current = -1;
    for r in ranges {
      if r[0] > current + 1 {
        println!("{}", 4000000 * (current as i64 + 1) + y as i64);
        return;
      }
      current = current.max(r[1]);
    }

    if current < 4000000 {
      println!("{}", 4000000 * (current as i64 + 1) + y as i64);
      return;
    }
  }
}
