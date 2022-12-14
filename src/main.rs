//use the arguments to execute the command cargo run --bin day01

use std::process::Command;

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let day = &args[1];
    println!("Running Day {}:", day);
    let day = if day.len() == 1 {
        format!("0{}", day)
    } else {
        day.to_string()
    };
    let day = format!("day{}", day);
    let output = Command::new("cargo")
        .arg("run")
        .arg("--bin")
        .arg(day)
        .arg("--quiet")
        .arg("--release")
        .output()
        .expect("failed to execute process");
    println!("{}", String::from_utf8_lossy(&output.stdout).trim_end());
    if !output.stderr.is_empty() {
        println!("{}", String::from_utf8_lossy(&output.stderr));
    }
}