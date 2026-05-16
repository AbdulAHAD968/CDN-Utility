export type NamingOptions = {
  prefix: string;
  folder?: string;
  startingNumber: number;
  padding: number;
  preserveOriginal?: boolean;
  randomSuffix?: boolean;
  slugify?: boolean;
};

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

export function generateSequentialNames(
  files: File[],
  options: NamingOptions
): string[] {
  const {
    prefix,
    startingNumber,
    padding,
    preserveOriginal,
    randomSuffix,
    slugify: shouldSlugify,
  } = options;

  return files.map((file, index) => {
    if (preserveOriginal) {
      const fileName = file.name.split(".").slice(0, -1).join(".");
      let finalName = shouldSlugify ? slugify(fileName) : fileName;
      
      if (randomSuffix) {
        const suffix = Math.random().toString(36).substring(2, 6);
        finalName = `${finalName}_${suffix}`;
      }
      
      return finalName;
    }

    const currentNumber = startingNumber + index;
    const paddedNumber = currentNumber.toString().padStart(padding, "0");
    
    let name = `${prefix}_${paddedNumber}`;
    
    if (randomSuffix) {
      const suffix = Math.random().toString(36).substring(2, 6);
      name = `${name}_${suffix}`;
    }

    return name;
  });
}
