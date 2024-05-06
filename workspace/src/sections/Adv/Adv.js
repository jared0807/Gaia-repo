import styled from "./Adv.module.css";

export function Adv(props) {
  const { image, title, description, right, isShowDefaultText } = props;

  return (
    <div
      className={`${styled.wrapper} ${right ? styled.wrapperRight : ""}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styled.content}>
        <div className="container">
          {isShowDefaultText && (
            <div className={styled.inner}>
              <p className={styled.title}>{title}</p>
              <p className={styled.description}>{description}</p>
            </div>
          )}
        </div>
      </div>
      <div className={styled.overlay} />
    </div>
  );
}
