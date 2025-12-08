export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `const fs = require("fs");

// Read all stdin
const input = fs.readFileSync(0, "utf8").trim().split("\\n");
const t = parseInt(input[0], 10);

// TODO: Implement this function
function twoSum(nums, target) {
  // Write your solution here
}

for (let i = 1; i <= t; i++) {
  const line = input[i].trim();
  if (!line) continue;
  const [arrStr, targetStr] = line.split("|").map(s => s.trim());
  const nums = arrStr.split(" ").map(Number);
  const target = parseInt(targetStr, 10);

  const result = twoSum(nums, target);
  console.log(\`[\${result[0]},\${result[1]}]\`);
}`,
      python: `import sys

def twoSum(nums, target):
    # Write your solution here
    pass

data = sys.stdin.read().strip().splitlines()
if not data:
    sys.exit(0)

t = int(data[0])
lines = data[1:]

for i in range(t):
    line = lines[i].strip()
    if not line:
        continue
    arr_part, target_part = map(str.strip, line.split("|"))
    nums = list(map(int, arr_part.split()))
    target = int(target_part)

    result = twoSum(nums, target)
    # Match expected output format: [0, 1]
    print(f"[{result[0]}, {result[1]}]")`,
      java: `import java.io.*;
import java.util.*;

class Solution {
    // TODO: Implement this function
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[2];
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) return;

        int t = Integer.parseInt(firstLine.trim());

        for (int i = 0; i < t; i++) {
            String line = br.readLine();
            if (line == null) break;
            line = line.trim();
            if (line.isEmpty()) {
                i--;
                continue;
            }

            String[] parts = line.split("\\\\|");
            String numsPart = parts[0].trim();
            String targetPart = parts[1].trim();

            String[] numStrs = numsPart.split("\\\\s+");
            int[] nums = new int[numStrs.length];
            for (int j = 0; j < numStrs.length; j++) {
                nums[j] = Integer.parseInt(numStrs[j]);
            }
            int target = Integer.parseInt(targetPart);

            int[] ans = twoSum(nums, target);
            // Match expected output format: [0, 1]
            System.out.println("[" + ans[0] + ", " + ans[1] + "]");
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

// TODO: Implement this function
vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    return vector<int>(2);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string line;
    if (!getline(cin, line)) return 0;
    int t = stoi(line);

    for (int caseNum = 0; caseNum < t; ++caseNum) {
        if (!getline(cin, line)) break;
        if (line.empty()) {
            --caseNum;
            continue;
        }

        size_t barPos = line.find('|');
        string numsPart = line.substr(0, barPos);
        string targetPart = line.substr(barPos + 1);

        stringstream ss(numsPart);
        vector<int> nums;
        int x;
        while (ss >> x) {
            nums.push_back(x);
        }

        int target = stoi(string(targetPart.begin(), targetPart.end()));

        vector<int> ans = twoSum(nums, target);
        // Match expected output format: [0,1]
        cout << "[" << ans[0] << "," << ans[1] << "]\n";
    }

    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
      cpp: "[0,1]\n[1,2]\n[0,1]",
    },
    stdin: `3
2 7 11 15 | 9
3 2 4 | 6
3 3 | 6`,
  },

  "product-of-array-except-self": {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array • Prefix Sum",
    description: {
      text: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
      notes: [
        "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
        "You must write an algorithm that runs in O(n) time and without using the division operation.",
      ],
    },
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁵",
      "-30 ≤ nums[i] ≤ 30",
      "The product of any prefix or suffix of nums fits in a 32-bit integer",
    ],
    starterCode: {
      javascript: `const fs = require("fs");

// Read all stdin
const input = fs.readFileSync(0, "utf8").trim().split("\\n");
const t = parseInt(input[0], 10);

// TODO: Implement this function
function productExceptSelf(nums) {
  // Write your solution here
}

for (let i = 1; i <= t; i++) {
  const line = input[i].trim();
  if (!line) continue;
  const nums = line.split(" ").map(Number);

  const result = productExceptSelf(nums);
  console.log(\`[\${result.join(",")}]\`);
}`,
      python: `import sys

def productExceptSelf(nums):
    # Write your solution here
    pass

data = sys.stdin.read().strip().splitlines()
if not data:
    sys.exit(0)

t = int(data[0])
lines = data[1:]

for i in range(t):
    line = lines[i].strip()
    if not line:
        continue
    nums = list(map(int, line.split()))
    result = productExceptSelf(nums)
    # Match expected output format: [24, 12, 8, 6]
    print("[" + ", ".join(str(x) for x in result) + "]")`,
      java: `import java.io.*;
import java.util.*;

class Solution {
    // TODO: Implement this function
    public static int[] productExceptSelf(int[] nums) {
        // Write your solution here
        return new int[nums.length];
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) return;

        int t = Integer.parseInt(firstLine.trim());

        for (int i = 0; i < t; i++) {
            String line = br.readLine();
            if (line == null) break;
            line = line.trim();
            if (line.isEmpty()) {
                i--;
                continue;
            }

            String[] numStrs = line.split("\\\\s+");
            int[] nums = new int[numStrs.length];
            for (int j = 0; j < numStrs.length; j++) {
                nums[j] = Integer.parseInt(numStrs[j]);
            }

            int[] ans = productExceptSelf(nums);
            // Match expected output format: [24, 12, 8, 6]
            System.out.println(Arrays.toString(ans));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

// TODO: Implement this function
vector<int> productExceptSelf(vector<int>& nums) {
    // Write your solution here
    return vector<int>(nums.size());
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string line;
    if (!getline(cin, line)) return 0;
    int t = stoi(line);

    for (int caseNum = 0; caseNum < t; ++caseNum) {
        if (!getline(cin, line)) break;
        if (line.empty()) {
            --caseNum;
            continue;
        }

        stringstream ss(line);
        vector<int> nums;
        int x;
        while (ss >> x) {
            nums.push_back(x);
        }

        vector<int> ans = productExceptSelf(nums);
        // Match expected output format: [24,12,8,6]
        cout << "[";
        for (int i = 0; i < (int)ans.size(); i++) {
            cout << ans[i];
            if (i + 1 < (int)ans.size()) cout << ",";
        }
        cout << "]\n";
    }

    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[24,12,8,6]\n[0,0,9,0,0]",
      python: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
      java: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
      cpp: "[24,12,8,6]\n[0,0,9,0,0]",
    },
    stdin: `2
1 2 3 4
-1 1 0 -3 3`,
  },
};


export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
};
