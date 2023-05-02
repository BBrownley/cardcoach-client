import React from "react";

import { Container, Wrapper } from "./Dashboard.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import ProgressBar from "@ramonak/react-progress-bar";

export default function Dashboard() {
  return (
    <Container>
      <Wrapper>
        <h4>Recently studied</h4>
        <div className="recent-sets set-container">
          <div className="set">
            <div className="set__title-desc">
              <div className="title">
                Computer Architecture and Operating Systems Management
              </div>
              <div className="desc">
                Terms and definitions for C952 and C191
              </div>
            </div>

            <div className="set__term-count">47 terms</div>

            <div className="progress">
              {" "}
              <FontAwesomeIcon icon={faStar} className="progress__star" />
              <ProgressBar
                completed={22}
                bgColor="#D9D9D9"
                height="1.25rem"
                baseBgColor="#777777"
                labelColor="#6e7faa"
                maxCompleted={47}
                customLabel={22}
                className="progress__bar"
              />
            </div>
          </div>
        </div>
        <h4>Your sets</h4>
        <div className="user-sets set-container">
          <div className="set">
            <div className="set__title-desc">
              <div className="title">
                Computer Architecture and Operating Systems Management
              </div>
              <div className="desc">
                Terms and definitions for C952 and C191
              </div>
            </div>

            <div className="set__term-count">47 terms</div>

            <div className="progress">
              {" "}
              <FontAwesomeIcon icon={faStar} className="progress__star" />
              <ProgressBar
                completed={22}
                bgColor="#D9D9D9"
                height="1.25rem"
                baseBgColor="#777777"
                labelColor="#6e7faa"
                maxCompleted={47}
                customLabel={22}
                className="progress__bar"
              />
            </div>
          </div>
          <div className="set">
            <div className="set__title-desc">
              <div className="title">
                Computer Architecture and Operating Systems Management
              </div>
              <div className="desc">
                Terms and definitions for C952 and C191
              </div>
            </div>

            <div className="set__term-count">47 terms</div>

            <div className="progress">
              {" "}
              <FontAwesomeIcon icon={faStar} className="progress__star" />
              <ProgressBar
                completed={22}
                bgColor="#D9D9D9"
                height="1.25rem"
                baseBgColor="#777777"
                labelColor="#6e7faa"
                maxCompleted={47}
                customLabel={22}
                className="progress__bar"
              />
            </div>
          </div>
          <div className="set">
            <div className="set__title-desc">
              <div className="title">
                Computer Architecture and Operating Systems Management
              </div>
              <div className="desc">
                Terms and definitions for C952 and C191
              </div>
            </div>

            <div className="set__term-count">47 terms</div>

            <div className="progress">
              {" "}
              <FontAwesomeIcon icon={faStar} className="progress__star" />
              <ProgressBar
                completed={22}
                bgColor="#D9D9D9"
                height="1.25rem"
                baseBgColor="#777777"
                labelColor="#6e7faa"
                maxCompleted={47}
                customLabel={22}
                className="progress__bar"
              />
            </div>
          </div>
          <div className="set">
            <div className="set__title-desc">
              <div className="title">
                Computer Architecture and Operating Systems Management
              </div>
              <div className="desc">
                Terms and definitions for C952 and C191
              </div>
            </div>

            <div className="set__term-count">47 terms</div>

            <div className="progress">
              {" "}
              <FontAwesomeIcon icon={faStar} className="progress__star" />
              <ProgressBar
                completed={22}
                bgColor="#D9D9D9"
                height="1.25rem"
                baseBgColor="#777777"
                labelColor="#6e7faa"
                maxCompleted={47}
                customLabel={22}
                className="progress__bar"
              />
            </div>
          </div>
          <div className="set">
            <div className="set__title-desc">
              <div className="title">
                Computer Architecture and Operating Systems Management
              </div>
              <div className="desc">
                Terms and definitions for C952 and C191
              </div>
            </div>

            <div className="set__term-count">47 terms</div>

            <div className="progress">
              {" "}
              <FontAwesomeIcon icon={faStar} className="progress__star" />
              <ProgressBar
                completed={22}
                bgColor="#D9D9D9"
                height="1.25rem"
                baseBgColor="#777777"
                labelColor="#6e7faa"
                maxCompleted={47}
                customLabel={22}
                className="progress__bar"
              />
            </div>
          </div>
        </div>
        <h4>Shared with you</h4>
        <div className="shared-sets set-container">
          <div className="set">
            <div className="set__title-desc">
              <div className="title">
                Computer Architecture and Operating Systems Management
              </div>
              <div className="desc">
                Terms and definitions for C952 and C191
              </div>
            </div>

            <div className="set__term-count">47 terms</div>

            <div className="progress">
              {" "}
              <FontAwesomeIcon
                icon={faStar}
                className="progress__star full-mastery"
              />
              <ProgressBar
                completed={47}
                bgColor="#AEAA68"
                height="1.25rem"
                baseBgColor="#777777"
                labelColor="#000000"
                maxCompleted={47}
                customLabel={"Full mastery!"}
                className="progress__bar"
              />
            </div>
          </div>
        </div>
        <div className="create-set-button">
          <FontAwesomeIcon icon={faPlusCircle} className="plus-circle" />
          <h4>Create new set</h4>
        </div>
      </Wrapper>
    </Container>
  );
}
