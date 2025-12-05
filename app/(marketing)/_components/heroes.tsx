import Image from "next/image";

function Heroes() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative size-[300px] sm:size-[350px] md:size-[400px]">
          <Image
            src={"/documents.png"}
            fill
            alt="Documents"
            className="object-contain dark:hidden"
          />
          <Image
            src={"/documents-dark.png"}
            fill
            alt="Documents"
            className="object-contain hidden dark:block"
          />
        </div>
        <div className="relative size-[400px] hidden md:block">
          <Image
            src={"/reading.png"}
            fill
            alt="Reading"
            className="object-contain dark:hidden"
          />
          <Image
            src={"/reading-dark.png"}
            fill
            alt="Reading"
            className="object-contain hidden dark:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Heroes;
