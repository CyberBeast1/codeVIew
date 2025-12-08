const PISTON_API_URL = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  java: { language: "java", version: "15.0.2" },
  cpp: { language: "cpp", version: "15.2.1" },
};

export async function runCode(language, code, input) {
  try {
    const langConfig = LANGUAGE_VERSIONS[language];
    if (!langConfig) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const response = await fetch(`${PISTON_API_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        stdin: input,
        files: [
          { name: `Main.${getExtension(langConfig.language)}`, content: code },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error executing code: ${response.statusText}`);
    }

    const result = await response.json();
    const output = result.run.output || "";
    const stderror = result.run.stderr || "";

    if (stderror) {
      return {
        success: false,
        output: output,
        error: stderror,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to run code: ${error.message}`,
    };
  }
}

function getExtension(language) {
  const extensions = {
    python: "py",
    javascript: "js",
    java: "java",
    cpp: "cpp",
  };
  return extensions[language] || "txt";
}
