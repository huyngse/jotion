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
            sizes="(min-width: 768px) 400px, (min-width: 640px) 350px, 300px"
          />
          <Image
            src={"/documents-dark.png"}
            fill
            alt="Documents"
            className="object-contain hidden dark:block"
            sizes="(min-width: 768px) 400px, (min-width: 640px) 350px, 300px"
          />
        </div>
        <div className="relative size-[400px] hidden md:block">
          <Image
            src={"/reading.png"}
            fill
            alt="Reading"
            className="object-contain dark:hidden"
            sizes="400px"
          />
          <Image
            src={"/reading-dark.png"}
            fill
            alt="Reading"
            className="object-contain hidden dark:block"
            sizes="400px"
          />
        </div>
      </div>
    </div>
  );
}

export default Heroes;
