use std::time::Instant;

fn main() {
    let input = include_str!("../../inputs/day01.txt");
    let now = Instant::now();
    day01(input);
    println!("Finished in: {:.3?}", now.elapsed());
}

fn day01(input: &str) {
    let input: Vec<Vec<i32>> = input
        .split("\n\n")
        .map(|group| {
            group
                .split("\n")
                .map(|line| line.parse::<i32>().unwrap())
                .collect::<Vec<i32>>()
        })
        .collect::<Vec<Vec<i32>>>();
    
    let mut sum = 0;
    let mut greatest_three_sums = [0, 0, 0];

    for group in input {
        for num in group {
            sum += num;
        }  

        if sum > greatest_three_sums[1] {
            if sum > greatest_three_sums[0] {
                greatest_three_sums = [sum, greatest_three_sums[0], greatest_three_sums[1]];
            } else {
                greatest_three_sums = [greatest_three_sums[0], sum, greatest_three_sums[1]];
            }
        } else if sum > greatest_three_sums[2] {
            greatest_three_sums = [greatest_three_sums[0], greatest_three_sums[1], sum];
        }
        sum = 0;
        
    }
    println!("{}", greatest_three_sums[0]);
    println!("{}", greatest_three_sums[0]+greatest_three_sums[1]+greatest_three_sums[2]);

}
