import classNames from 'classnames';

export function Headline_00({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-bold text-xl leading-8 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function Headline_01({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-bold text-xl leading-7 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function Headline_02({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-bold text-lg leading-7 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function Headline_02_Light({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-medium text-lg leading-7 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function Subtitle_01({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-semibold text-lg leading-6 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function Subtitle_02({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-bold text-base leading-6 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function BodyLarge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-medium text-base leading-6 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function BodyMedium({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-medium text-base leading-6 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function BodySmall({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-medium text-sm leading-5 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function Body_02({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-normal text-sm leading-5 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function LabelLarge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-medium text-xs leading-4 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function LabelMedium({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-medium text-xs leading-4 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function LabelSmall({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-medium text-xs leading-3.5 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}

export function Body_01({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        className,
        'font-medium text-base leading-6 font-pretendard',
      )}
    >
      {children}
    </div>
  );
}
